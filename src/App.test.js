import { render, screen } from "@testing-library/react";
import {
  fetchUsernames,
  validateUsername,
  validatePassword,
  fetchAlbums,
  fetchUsers,
} from "./data/DataHandler";
import { LoginPage } from "./routes/LoginPage";
import { DashboardPage } from "./routes/DashboardPage";

describe("Test for authentication", () => {
    test("Usernames get fetched properly", async () => {
    const usernames = await fetchUsernames();
    expect(usernames).toStrictEqual(expect.arrayContaining(["Bret"]));
    expect(usernames).toStrictEqual([
      "Bret",
      "Antonette",
      "Samantha",
      "Karianne",
      "Kamren",
      "Leopoldo_Corkery",
      "Elwyn.Skiles",
      "Maxime_Nienow",
      "Delphine",
      "Moriah.Stanton",
    ]);
  });

  test("Username validation works", async () => {
    expect(await validateUsername("Bret")).toBe(true);
    expect(await validateUsername("Bambi")).toBe(false);
  });

  test("Password validation works", () => {
    expect(validatePassword("TheSunIsShining")).toBe(false);
    expect(validatePassword("123456")).toBe(true);
  });
});

describe("Tests for general internal data handling", () => {
  let albums, users;
  beforeAll(async () => {
    albums = await fetchAlbums();
    users = await fetchUsers();
  });
  test("Albums get fetched properly", () => {
    expect(albums).toStrictEqual(
      expect.arrayContaining([
        {
          id: 93,
          title: "nisi qui dolores perspiciatis",
          userId: 10,
        },
      ])
    );

    expect(albums).toStrictEqual(
      expect.arrayContaining([
        {
          id: 2,
          title: "sunt qui excepturi placeat culpa",
          userId: 1,
        },
      ])
    );
    expect(albums).toHaveLength(100);
  });

  test("Users get fetched properly", () => {
    expect(users).toHaveLength(10);
    expect(users).toStrictEqual(
      expect.arrayContaining([
        {
          address: {
            city: "Gwenborough",
            geo: { lat: "-37.3159", lng: "81.1496" },
            street: "Kulas Light",
            suite: "Apt. 556",
            zipcode: "92998-3874",
          },
          company: {
            bs: "harness real-time e-markets",
            catchPhrase: "Multi-layered client-server neural-net",
            name: "Romaguera-Crona",
          },
          email: "Sincere@april.biz",
          id: 1,
          name: "Leanne Graham",
          phone: "1-770-736-8031 x56442",
          username: "Bret",
          website: "hildegard.org",
        },
      ])
    );
  });
});

describe('Some UI tests', () => {
  test('Renders the login page', async () => {
    const { findAllByText } = render(<LoginPage />);
    const titleElement = await findAllByText(/Login/i);
    expect(titleElement[0]).toBeInTheDocument();
  });
});
