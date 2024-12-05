
resource "google_firestore_database" "sources-fs" {
  depends_on              = [google_project_service.project_services]
  project                 = var.project_id
  name                    = "sources"
  location_id             = var.region
  delete_protection_state = "DELETE_PROTECTION_ENABLED"
  type                    = "FIRESTORE_NATIVE"
}

