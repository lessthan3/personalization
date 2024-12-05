#SA creation
resource "google_service_account" "python_nb_sa" {
  project      = var.project_id
  account_id   = "python-nb-sa"
  display_name = "Service Account for python notebooks"
}

#SA access to himself
resource "google_service_account_iam_member" "python_nb_sa_self" {
  service_account_id = google_service_account.python_nb_sa.name
  for_each = toset([
    "roles/iam.serviceAccountTokenCreator",
    "roles/iam.serviceAccountUser"
  ])
  role   = each.key
  member = google_service_account.python_nb_sa.member
}

#SA project permissions
resource "google_project_iam_member" "python_nb_sa_project_access" {
  project = var.project_id
  for_each = toset([
    "roles/datastore.user",
    "roles/storage.objectViewer",
    "roles/storage.objectUser",
    "roles/secretmanager.secretAccessor",
  ])
  role   = each.key
  member = google_service_account.python_nb_sa.member
}

#access to other SA
resource "google_service_account_iam_member" "backend_admin" {
  service_account_id = google_service_account.backend_sa.name
  for_each = toset([
    "roles/iam.serviceAccountTokenCreator",
    "roles/iam.serviceAccountUser"
  ])
  role   = each.key
  member = google_service_account.python_nb_sa.member
}

#Access to buckets
resource "google_storage_bucket_iam_member" "python_nb_sa_access" {
  bucket = google_storage_bucket.maestro_backend_overlays.name
  for_each = toset([
    "roles/storage.objectViewer",
    "roles/storage.objectUser",
    "roles/storage.admin"
  ])
  role   = each.key
  member = google_service_account.python_nb_sa.member
}
