const database = () => ({
  ref: (path) => {
    return {
      once: jest.fn(() =>
        Promise.resolve({
          val: () => {
            if (path === "users/user123") {
              return {
                name: "Test User",
                zipCode: 1111,
                longitude: "longtidue",
                latitude: "latitude",
              };
            } else if (path === "users") {
              return {
                user123: {
                  name: "Test User 1",
                  zipCode: 1111,
                  longitude: "longtidue",
                  latitude: "latitude",
                },
                user456: {
                  name: "Test User 2",
                  zipCode: 112211,
                  longitude: "longtidue",
                  latitude: "latitude",
                },
              };
            }
            return {
              name: "Test User 3",
              zipCode: 1133311,
              longitude: "longtidue",
              latitude: "latitude",
            };
          },
          exists: () => path === "users/user123" || path === "users",
        })
      ),
      update: jest.fn(() => Promise.resolve()),
      set: jest.fn(() => Promise.resolve()),
      push: jest.fn(() => ({
        key: "new-unique-key",
        set: jest.fn(() => Promise.resolve()),
      })),
    };
  },
});

database.ServerValue = {
  TIMESTAMP: {},
};
const admin = {
  initializeApp: jest.fn(),
  database: database,
  credential: {
    cert: jest.fn(),
    applicationDefault: jest.fn(),
  },
};

export default admin;
