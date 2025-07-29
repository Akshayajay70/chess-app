#!/bin/bash
set -e

# Wait for Kafka broker to be ready on PLAINTEXT listener
for i in {1..20}; do
  if /opt/kafka/bin/kafka-topics.sh --bootstrap-server kafka:9092 --list >/dev/null 2>&1; then
    echo "Kafka is ready"
    break
  fi
  echo "Waiting for Kafka to be ready... ($i/20)"
  sleep 2
done

# Create topics if they do not already exist
/opt/kafka/bin/kafka-topics.sh --create --if-not-exists --topic user.created --bootstrap-server kafka:9092 --partitions 1 --replication-factor 1
/opt/kafka/bin/kafka-topics.sh --create --if-not-exists --topic user.status.updated --bootstrap-server kafka:9092 --partitions 1 --replication-factor 1

exec "$@"
