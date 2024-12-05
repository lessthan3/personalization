
#Temporary access during development
resource "google_project_iam_member" "federico_permissions" {
  project  = var.project_id
  for_each = toset(var.pipol_permissions)
  role     = each.key
  member   = "user:federico.acien@globant.com"
}

#Temporary access during development
resource "google_project_iam_member" "amilcar_permissions" {
  project  = var.project_id
  for_each = toset(var.pipol_permissions)
  role     = each.key
  member   = "user:amilcar.infante@globant.com"
}

/*#Temporary access during development
resource "google_project_iam_member" "ilan_permissions" {
  project  = var.project_id
  for_each = toset(var.pipol_permissions)
  role     = each.key
  member   = "user:ilan.rosenfeld@globant.com"
}*/

#Temporary access during development
resource "google_project_iam_member" "mauro_permissions" {
  project = var.project_id
  for_each = toset([
    "roles/storage.objectViewer",
    "roles/storage.objectUser"
  ])
  role   = each.key
  member = "user:mario.mauvecin@globant.com"
}

#All should be able to use the SA:
resource "google_service_account_iam_member" "backend_admin_group" {
  service_account_id = google_service_account.backend_sa.name
  role               = "roles/iam.serviceAccountUser"
  for_each           = toset(var.sa_users)
  member             = each.key
}

variable "sa_users" {
  type        = list(any)
  description = "users able to impersonate the SA"
  default = ([
    "user:federico.acien@globant.com",
    "user:felipe.bozzano@globant.com",
    "user:amilcar.infante@globant.com",
    "user:manuel.aller@globant.com",
    "user:julioisrael.gonzalez@globant.com",
  ])
}

variable "pipol_permissions" {
  type        = list(any)
  description = "permissions needed to develop things"
  default = ([
    "roles/aiplatform.admin",
    "roles/aiplatform.user",
    "roles/bigquery.connectionUser",
    "roles/bigquery.dataViewer",
    "roles/bigquery.jobUser",
    "roles/bigquery.studioUser",
    "roles/bigquery.user",
    "roles/compute.instanceAdmin",
    "roles/dataflow.admin",
    "roles/dataproc.admin",
    "roles/datastore.owner",
    "roles/datastore.user",
    "roles/iam.serviceAccountTokenCreator",
    "roles/iam.serviceAccountUser",
    "roles/iam.serviceAccountViewer",
    "roles/livestream.editor",
    "roles/logging.admin",
    "roles/logging.logWriter",
    "roles/monitoring.editor",
    "roles/run.developer",
    "roles/run.invoker",
    "roles/run.sourceViewer",
    "roles/secretmanager.secretAccessor",
    "roles/serviceusage.serviceUsageConsumer",
    "roles/storage.admin",
    "roles/speech.client",
    "roles/vpcaccess.user",
  ])
}


#Temporary access during development
resource "google_project_iam_member" "felipe_permissions" {
  project  = var.project_id
  for_each = toset(var.pipol_permissions)
  role     = each.key
  member   = "user:felipe.bozzano@globant.com"
}

resource "google_project_iam_member" "felipe_redis" {
  project = var.project_id
  role    = "roles/redis.editor"
  member  = "user:felipe.bozzano@globant.com"
}
