
#Enable APIs in the project
resource "google_project_service" "project_services" {
  project = var.project_id
  for_each = toset([
#    "artifactregistry.googleapis.com",
#    "compute.googleapis.com",
#    "container.googleapis.com",
#    "containerscanning.googleapis.com",
    "dataflow.googleapis.com",
#    "dataproc.googleapis.com",
    "firestore.googleapis.com",
    "logging.googleapis.com",
    "monitoring.googleapis.com",
#    "networkservices.googleapis.com",
#    "run.googleapis.com",
  ])
  service                    = each.key
  disable_dependent_services = false
  disable_on_destroy         = true

  timeouts {
    create = "5m"
    update = "10m"
  }
}
