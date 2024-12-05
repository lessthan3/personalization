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
        GoogleAuth: jest.fn().mockImplementation(() => ({
          getProjectId: jest.fn().mockResolvedValue("id:12345")
        }))
      },
      cloudresourcemanager: jest.fn(() => {
        return {
          projects: {
            get: jest.fn().mockRejectedValue("Error message")
          }
        };
      })
    }
  };
});

describe("GoogleService-CloudError", () => {
  describe("getCurrentProjectNumber", () => {
    it("should catch and throw error from #GoogleAuth-getProjectId", async () => {
      expect(googleService.getCurrentProjectNumber()).rejects.toEqual("Error message");
    });
  });
});
