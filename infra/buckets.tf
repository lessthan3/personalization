
# Temporary access
resource "google_storage_bucket_iam_member" "maestro_backend_overlays_iam" {
  bucket = google_storage_bucket.maestro_backend_overlays.name
  role   = "roles/storage.objectViewer"
  for_each = toset([
    "user:mariana.nievas@globant.com",
    "user:mario.mauvecin@globant.com"
  ])
  member = each.key
}

resource "google_storage_bucket" "maestro_backend_overlays" {
  project                     = var.project_id
  name                        = "maestro_backend_overlays"
  location                    = var.region
  storage_class               = "STANDARD"
  uniform_bucket_level_access = true
  public_access_prevention    = "enforced"
}
