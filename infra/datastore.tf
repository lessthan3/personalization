resource "google_firestore_database" "overlays-ds" {
  depends_on  = [google_project_service.project_services]
  project     = var.project_id
  name        = "overlays-ds"
  location_id = var.region
  type        = "DATASTORE_MODE"
}

resource "google_firestore_database" "overlays-fs" {
  depends_on              = [google_project_service.project_services]
  project                 = var.project_id
  name                    = "overlays-fs"
  location_id             = var.region
  delete_protection_state = "DELETE_PROTECTION_ENABLED"
  type                    = "FIRESTORE_NATIVE"
}

