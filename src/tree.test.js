import faker from "faker";
import { createList, createNestedList, createTree } from "./tree";

faker.seed(123);

test("uuid", () => {
  expect(faker.random.uuid()).toEqual("bb463b8b-b76c-4f6a-9726-65ab5730b69b");
});

test("createList", () => {
  expect(createList(3)).toEqual([
    "Idella Dare",
    "Ms. Merritt Lemke",
    "Roslyn Kulas"
  ]);
});

test("createNestedLists", () => {
  expect(createNestedList({ depth: 2, fanOut: 2 })).toEqual([
    {
      name: "Leonor Hermiston",
      children: [
        {
          name: "Dante Feest",
          children: []
        },
        {
          name: "London Runolfsson",
          children: []
        }
      ]
    },
    {
      name: "Enola O'Keefe",
      children: [
        {
          name: "Ms. Horacio Barrows",
          children: []
        },
        {
          name: "Cara Kassulke Jr.",
          children: []
        }
      ]
    }
  ]);
});

test("createNestedLists", () => {
  expect(createTree({ depth: 2, fanOut: 2 })).toEqual({
    topIds: [
      "869c17dc-9486-4504-96ba-de487a49d94a",
      "0be246c3-55d8-40a8-932e-57a3d48dd86a"
    ],
    nodes: {
      "0be246c3-55d8-40a8-932e-57a3d48dd86a": {
        name: "Tyreek Langosh",
        childIds: [
          "5c5d26d0-5788-4998-80ef-ae5384784e4f",
          "94b98c56-abd2-429f-95fd-11603e7e8310"
        ]
      },
      "5c5d26d0-5788-4998-80ef-ae5384784e4f": {
        name: "Terence Friesen",
        childIds: []
      },
      "869c17dc-9486-4504-96ba-de487a49d94a": {
        name: "Hershel Rohan",
        childIds: [
          "8d215ce3-2379-4318-a2ae-bf079488242c",
          "b158be83-65ed-4db5-a034-668b8f05ac09"
        ]
      },
      "8d215ce3-2379-4318-a2ae-bf079488242c": {
        name: "Lindsay Mante",
        childIds: []
      },
      "94b98c56-abd2-429f-95fd-11603e7e8310": {
        name: "Mrs. Jerod Yost",
        childIds: []
      },
      "b158be83-65ed-4db5-a034-668b8f05ac09": {
        name: "Emiliano Kunze III",
        childIds: []
      }
    }
  });
});
