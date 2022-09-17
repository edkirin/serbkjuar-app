package cfg

import (
	"fmt"
	"os"

	"github.com/kelseyhightower/envconfig"
	"github.com/sirupsen/logrus"
	"gopkg.in/yaml.v2"
)

type configStruct struct {
	Site struct {
		Url string `yaml:"url"`
	}
	Server struct {
		Port string `yaml:"port"`
		Host string `yaml:"host"`
		Name string `yaml:"name"`
	} `yaml:"server"`
	Database struct {
		Host     string `yaml:"host"`
		Port     string `yaml:"port"`
		Name     string `yaml:"name"`
		Username string `yaml:"user"`
		Password string `yaml:"pass"`
	} `yaml:"database"`
	Application struct {
		StaticPath      *string `yaml:"staticPath"`
		LogPath         *string `yaml:"logPath"`
		DebugSQL        bool    `yaml:"debugSQL"`
		IsProduction    bool    `yaml:"isProduction"`
		EpiloggToken    *string `yaml:"epiloggToken"`
		EpiloggClientId *string `yaml:"epiloggClientId"`
	} `yaml:"application"`
}

const DEFAULT_CONFIG_FILE = "conf/service.yaml"
const ENV_PREFIX = "SERBKJUAR"

var Config configStruct
var log = logrus.New()

func processError(err error) {
	log.Error("Config file error: " + err.Error())
	os.Exit(2)
}

func readFile(cfgFile string, cfg *configStruct) {
	f, err := os.Open(cfgFile)
	if err != nil {
		processError(err)
	} else {
		decoder := yaml.NewDecoder(f)
		err = decoder.Decode(cfg)
		if err != nil {
			processError(err)
		}
	}
	defer f.Close()
	log.Info("Using config file: " + cfgFile)
}

func readEnv(cfg *configStruct) {
	err := envconfig.Process(ENV_PREFIX, cfg)
	if err != nil {
		processError(err)
	}
}

func Init() {
	cfgFile := os.Getenv("SERBKJUAR_CONFIG")
	if cfgFile == "" {
		cfgFile = DEFAULT_CONFIG_FILE
	}

	readFile(cfgFile, &Config)
	readEnv(&Config)

	fmt.Println("--- CONFIG -------------------------------")
	fmt.Println(Config)
	fmt.Println("------------------------------------------")
}
