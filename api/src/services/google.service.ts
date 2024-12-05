import { google } from "googleapis";
import { Firestore } from "@google-cloud/firestore";
import { RULES_FIRESTORE_DB_ID } from "../constants/database.constant";

export const auth = new google.auth.GoogleAuth({
  scopes: ["https://www.googleapis.com/auth/cloud-platform"]
});

google.options({ auth });

const cloudResourceManager = google.cloudresourcemanager("v1");
const firestore = new Firestore({ databaseId: RULES_FIRESTORE_DB_ID });

async function getCurrentProjectId() {
  const currentProjectId = await auth.getProjectId();

  return currentProjectId;
}

async function getCurrentProjectNumber() {
  const currentProjectId = await getCurrentProjectId();
  const currentProjectNumber = cloudResourceManager.projects.get({
    projectId: currentProjectId
  });

  return (await currentProjectNumber).data.projectNumber;
}

export { cloudResourceManager, getCurrentProjectId, getCurrentProjectNumber, firestore };
