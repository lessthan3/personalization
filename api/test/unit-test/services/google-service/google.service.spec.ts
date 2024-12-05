import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
import * as googleService from "../../../../src/services/google.service";

// Mock the external dependencies or functions
jest.mock("@google-cloud/secret-manager", () => {});

jest.mock("googleapis", () => {
  const actualApi = jest.requireActual("googleapis");
  const actualGoogle = actualApi.google;
  return {
    ...actualApi,
    google: {
      ...actualGoogle,
      options: jest.fn(),
      auth: {
        GoogleAuth: jest.fn().mockImplementation(function () {
          return {
            getProjectId: jest.fn().mockResolvedValue("id:12345")
          };
        })
      },
      cloudresourcemanager: jest.fn(() => {
        return {
          projects: {
            get: jest.fn().mockResolvedValue({
              data: { projectNumber: "1234" }
            })
          }
        };
      })
    }
  };
});

const googleapis = require("googleapis");

describe("GoogleService", () => {
  describe("getCurrentProjectId", () => {
    it("should call getProjectId and return the current projectId", async () => {
      const idResponse = "id:12345";
      const projectId = await googleService.getCurrentProjectId();

      expect(projectId).toEqual(idResponse);
    });
  });

  describe("getCurrentProjectNumber", () => {
    it("should return the correct project number", async () => {
      jest.spyOn(googleService, "getCurrentProjectId");
      jest.spyOn(googleService.cloudResourceManager.projects, "get");

      const projectNumber = await googleService.getCurrentProjectNumber();

      expect(projectNumber).toEqual("1234");

      expect(googleService.cloudResourceManager.projects.get).toHaveBeenCalledWith({ projectId: "id:12345" });
    });
  });
});
