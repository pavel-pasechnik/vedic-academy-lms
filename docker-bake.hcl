group "default" {
  targets = ["db", "web"]
}

target "db" {
  context = "docker"
  dockerfile = "postgres_ua/Dockerfile"
  tags = ["vedic_academy_db:latest"]
  platforms = ["linux/amd64"]
  output = ["type=docker"]
}

target "web" {
  context = "."
  dockerfile = "docker/web/Dockerfile"
  tags = ["vedic_academy_lms:latest"]
  platforms = ["linux/amd64"]
  output = ["type=docker"]
}
