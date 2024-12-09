
#Enable APIs in the project
resource "google_project_service" "project_services" {
  project = var.project_id
  for_each = toset([
    "aiplatform.googleapis.com",
    "artifactregistry.googleapis.com",
    "bigquery.googleapis.com",
    "compute.googleapis.com",
    "containeranalysis.googleapis.com",
    "datacatalog.googleapis.com",
    "dataflow.googleapis.com",
    "firestore.googleapis.com",
    "logging.googleapis.com",
    "monitoring.googleapis.com",
    "notebooks.googleapis.com",
    "visionai.googleapis.com",
  ])
  service                    = each.key
  disable_dependent_services = false
  disable_on_destroy         = true

  timeouts {
    create = "5m"
    update = "10m"
  }
}
