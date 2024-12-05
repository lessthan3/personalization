resource "google_project_iam_member" "github-sa" {
  project = var.project_id
  for_each = toset([
    "roles/artifactregistry.createOnPushWriter",
    "roles/dataflow.admin",
    "roles/datastore.owner",
    "roles/editor",
    "roles/firebase.admin",
    "roles/storage.admin",
  ])
  role   = each.key
  member = "serviceAccount:${var.terraform_sa}"
}
