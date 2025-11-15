package observability

import (
	"net/http"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

type Metrics struct {
	NodesTotal              prometheus.Gauge
	WorkloadsScheduledTotal prometheus.Counter
	EvidenceStoredTotal     prometheus.Counter
	BlockchainTxTotal       prometheus.Counter
	NetworkFailoversTotal   prometheus.Counter
	AllocationLatency       prometheus.Histogram
	StorageOperations       *prometheus.CounterVec
	SchedulerDecisions      *prometheus.HistogramVec
}

type Observability struct {
	Logger  *zap.Logger
	Metrics *Metrics
}

func New(logLevel string) (*Observability, error) {
	logger, err := createLogger(logLevel)
	if err != nil {
		return nil, err
	}

	metrics := createMetrics()

	logger.Info("Observability initialized",
		zap.String("log_level", logLevel),
		zap.Int("metrics_count", 9),
	)

	return &Observability{
		Logger:  logger,
		Metrics: metrics,
	}, nil
}

func createLogger(logLevel string) (*zap.Logger, error) {
	var level zapcore.Level
	switch logLevel {
	case "debug":
		level = zapcore.DebugLevel
	case "info":
		level = zapcore.InfoLevel
	case "warn":
		level = zapcore.WarnLevel
	case "error":
		level = zapcore.ErrorLevel
	default:
		level = zapcore.InfoLevel
	}

	config := zap.Config{
		Level:       zap.NewAtomicLevelAt(level),
		Development: false,
		Encoding:    "json",
		EncoderConfig: zapcore.EncoderConfig{
			TimeKey:        "ts",
			LevelKey:       "level",
			NameKey:        "logger",
			CallerKey:      "caller",
			FunctionKey:    zapcore.OmitKey,
			MessageKey:     "msg",
			StacktraceKey:  "stacktrace",
			LineEnding:     zapcore.DefaultLineEnding,
			EncodeLevel:    zapcore.LowercaseLevelEncoder,
			EncodeTime:     zapcore.ISO8601TimeEncoder,
			EncodeDuration: zapcore.SecondsDurationEncoder,
			EncodeCaller:   zapcore.ShortCallerEncoder,
		},
		OutputPaths:      []string{"stdout"},
		ErrorOutputPaths: []string{"stderr"},
	}

	return config.Build()
}

func createMetrics() *Metrics {
	metrics := &Metrics{
		NodesTotal: prometheus.NewGauge(prometheus.GaugeOpts{
			Name: "ace_nodes_total",
			Help: "Total number of registered nodes in ACE",
		}),
		WorkloadsScheduledTotal: prometheus.NewCounter(prometheus.CounterOpts{
			Name: "ace_workloads_scheduled_total",
			Help: "Total number of workloads scheduled by ACE",
		}),
		EvidenceStoredTotal: prometheus.NewCounter(prometheus.CounterOpts{
			Name: "ace_evidence_stored_total",
			Help: "Total number of evidence items stored by ACE",
		}),
		BlockchainTxTotal: prometheus.NewCounter(prometheus.CounterOpts{
			Name: "ace_blockchain_tx_total",
			Help: "Total number of blockchain transactions submitted by ACE",
		}),
		NetworkFailoversTotal: prometheus.NewCounter(prometheus.CounterOpts{
			Name: "ace_network_failovers_total",
			Help: "Total number of network layer failover events",
		}),
		AllocationLatency: prometheus.NewHistogram(prometheus.HistogramOpts{
			Name:    "ace_allocation_latency_seconds",
			Help:    "Latency of resource allocation operations",
			Buckets: prometheus.DefBuckets,
		}),
		StorageOperations: prometheus.NewCounterVec(
			prometheus.CounterOpts{
				Name: "ace_storage_operations_total",
				Help: "Total storage operations by type",
			},
			[]string{"operation", "backend"},
		),
		SchedulerDecisions: prometheus.NewHistogramVec(
			prometheus.HistogramOpts{
				Name:    "ace_scheduler_decision_latency_seconds",
				Help:    "Latency of scheduler decisions",
				Buckets: prometheus.DefBuckets,
			},
			[]string{"workload_type"},
		),
	}

	prometheus.MustRegister(
		metrics.NodesTotal,
		metrics.WorkloadsScheduledTotal,
		metrics.EvidenceStoredTotal,
		metrics.BlockchainTxTotal,
		metrics.NetworkFailoversTotal,
		metrics.AllocationLatency,
		metrics.StorageOperations,
		metrics.SchedulerDecisions,
	)

	return metrics
}

func (o *Observability) StartMetricsServer(addr string) error {
	http.Handle("/metrics", promhttp.Handler())
	
	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	http.HandleFunc("/ready", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("READY"))
	})

	o.Logger.Info("Starting metrics server", zap.String("address", addr))
	return http.ListenAndServe(addr, nil)
}

func (o *Observability) Shutdown() error {
	o.Logger.Info("Shutting down observability")
	return o.Logger.Sync()
}
