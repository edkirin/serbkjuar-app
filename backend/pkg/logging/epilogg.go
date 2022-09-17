package logging

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"
)

const EPILOGG_API_URL = "https://epilogg.mjerenja.com/api/"

type LogFormat int
type LogLevel int
type LogDirection int

const (
	FORMAT_PLAIN LogFormat = 0
	FORMAT_JSON  LogFormat = 1
	FORMAT_XML   LogFormat = 2
	FORMAT_YAML  LogFormat = 3
)

const (
	LEVEL_NOT_SET  LogLevel = 0
	LEVEL_DEBUG    LogLevel = 10
	LEVEL_INFO     LogLevel = 20
	LEVEL_WARNING  LogLevel = 30
	LEVEL_ERROR    LogLevel = 40
	LEVEL_CRITICAL LogLevel = 50
)

const (
	DIRECTION_NONE     LogDirection = 0
	DIRECTION_REQUEST  LogDirection = 1
	DIRECTION_RESPONSE LogDirection = 2
)

type PostData struct {
	ClientId  string        `json:"client_id"`
	Command   string        `json:"command"`
	Data      string        `json:"data"`
	Format    LogFormat     `json:"format"`
	Level     LogLevel      `json:"level"`
	Category  string        `json:"category"`
	Group     *string       `json:"group"`
	Variables *string       `json:"variables"`
	Direction *LogDirection `json:"direction"`
	Timestamp time.Time     `json:"timestamp"`
}

type EpiloggAPIClient struct {
	Token    string
	ClientId string
	Category string
}

func (client *EpiloggAPIClient) sendLogData(data PostData) {
	jsonData, err := json.Marshal(data)
	if err != nil {
		fmt.Println(err)
		return
	}
	httpClient := http.Client{
		Timeout: 5 * time.Second,
	}

	req, err := http.NewRequest(http.MethodPost, EPILOGG_API_URL, bytes.NewReader(jsonData))
	if err != nil {
		fmt.Printf("Got error %s", err.Error())
	}
	req.Header.Set("User-Agent", "serbkjuar")
	req.Header.Add("Authorization", strings.Join([]string{"Token ", client.Token}, ""))
	req.Header.Add("Content-Type", "application/json")
	_, err = httpClient.Do(req)
	if err != nil {
		fmt.Printf("Got error %s", err.Error())
	}
}

func (client *EpiloggAPIClient) log(level LogLevel, message string) {
	go client.sendLogData(PostData{
		Command:   "log",
		ClientId:  client.ClientId,
		Data:      message,
		Format:    FORMAT_PLAIN,
		Level:     level,
		Category:  client.Category,
		Group:     nil,
		Variables: nil,
		Direction: nil,
		Timestamp: time.Now(),
	})
}

func (client *EpiloggAPIClient) Info(message string) {
	client.log(LEVEL_INFO, message)
}

func (client *EpiloggAPIClient) Error(message string) {
	client.log(LEVEL_ERROR, message)
}

func (client *EpiloggAPIClient) Warn(message string) {
	client.log(LEVEL_WARNING, message)
}
