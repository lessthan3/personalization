import * as googleService from "../../../../src/services/google.service";

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
            getProjectId: jest.fn().mockRejectedValue("Error message")
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

describe("GoogleService-AuthError", () => {
  describe("getCurrentProjectId", () => {
    it("should catch and throw error from #GoogleAuth-getProjectId", async () => {
      expect(googleService.getCurrentProjectId()).rejects.toEqual("Error message");
    });
  });

  describe("getCurrentProjectNumber", () => {
    it("should catch and throw error from #GoogleAuth-getProjectId", async () => {
      expect(googleService.getCurrentProjectNumber()).rejects.toEqual("Error message");
    });
  });
});
