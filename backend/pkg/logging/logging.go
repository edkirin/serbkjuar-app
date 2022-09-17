package logging

import (
	"os"
	"path/filepath"
	"serbkjuar/pkg/cfg"

	"github.com/sirupsen/logrus"
)

var Log = logrus.New()
var Epilogg *EpiloggAPIClient = nil

func Info(message string) {
	Log.Info(message)

	if Epilogg != nil {
		Epilogg.Info(message)
	}
}

func Error(message string) {
	Log.Error(message)

	if Epilogg != nil {
		Epilogg.Error(message)
	}
}

func Warn(message string) {
	Log.Warn(message)

	if Epilogg != nil {
		Epilogg.Warn(message)
	}
}

func Init() {
	Log.SetLevel(logrus.DebugLevel)
	Log.SetFormatter(&logrus.TextFormatter{
		FullTimestamp:   true,
		TimestampFormat: "2006-01-02 15:04:05",
		PadLevelText:    true,
		DisableQuote:    true,
	})

	if cfg.Config.Application.LogPath != nil {
		logPath := *cfg.Config.Application.LogPath
		file, err := os.OpenFile(
			filepath.Join(logPath, "service.log"),
			os.O_CREATE|os.O_WRONLY|os.O_APPEND,
			0666,
		)
		if err == nil {
			Log.Out = file
		} else {
			Log.Warning("Failed to log to file, using default stderr")
		}
	}

	if cfg.Config.Application.EpiloggToken != nil && cfg.Config.Application.EpiloggClientId != nil {
		Epilogg = &EpiloggAPIClient{
			Token:    *cfg.Config.Application.EpiloggToken,
			ClientId: *cfg.Config.Application.EpiloggClientId,
			Category: "test",
		}
	}
}
