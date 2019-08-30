import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  BEGIN_TASK_EDITING,
  CHANGE_TASK_EDITING,
  UPDATE_CARD_BEGIN,
  beginCardEditing,
  changeCardEditing,
  updateCardBegin,
  updateCard,
  UPDATE_CARD_SUCCESS,
  UpdateCardBeginAction,
  UpdateCardActions
} from "./updateCardActions";
import expect from "expect";
import { Card, CardLoaded } from "./types";
import { backendUrl } from "../../backendUrl";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("card editing actions", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should dispatch action on start editing", () => {
    const store = mockStore();
    const card = { id: "13", content: "hi" };

    const action = store.dispatch(beginCardEditing(card));

    expect(action).toEqual({
      type: BEGIN_TASK_EDITING,
      card: card,
      editing: true
    });
  });

  it("should dispatch action on change editing", () => {
    const store = mockStore();
    const card = { id: "13", content: "hi" };

    const newContent = "jarl";
    const action = store.dispatch(changeCardEditing(card, newContent));

    expect(action).toEqual({
      type: CHANGE_TASK_EDITING,
      card: card,
      newContent: newContent
    });
  });

  it("should dispatch UPDATE_CARD_BEGIN for card with new content and not editing", () => {
    const store = mockStore();
    const card: CardLoaded = {
      id: "13",
      content: "hi",
      editing: true,
      loading: false,
      _id: "backend-generated-id-jarl"
    };

    const newContent = "jarl";
    const action = store.dispatch(updateCardBegin(card, newContent));

    const cardWithNewContentNotEditing: Card = {
      ...card,
      content: newContent,
      editing: false
    };
    const expectedAction: UpdateCardBeginAction = {
      type: UPDATE_CARD_BEGIN,
      card: cardWithNewContentNotEditing
    };
    expect(action).toEqual(expectedAction);
  });

  it("should BEGIN, fetch and SUCCESS on update card", () => {
    const store = mockStore();
    const card: CardLoaded = {
      id: "card-13",
      content: "Do the laundry",
      _id: "autogenerated-backend-id-grmblf",
      loading: false
    };
    fetchMock.once(JSON.stringify({ json: card }));

    const newContent = "new content";
    const cardWithNewContentNotEditing: Card = {
      ...card,
      content: newContent,
      editing: false
    };
    return store
      .dispatch(updateCard(card, newContent) as any)
      .then(expectations());

    function expectations(): any {
      return () => {
        const expectedActions: UpdateCardActions[] = [
          { type: UPDATE_CARD_BEGIN, card: cardWithNewContentNotEditing },
          { type: UPDATE_CARD_SUCCESS, card: cardWithNewContentNotEditing }
        ];
        expect(store.getActions()).toEqual(expectedActions);
        expect(fetchMock.mock.calls.length).toEqual(1);
        expect(fetchMock.mock.calls[0][0].url).toEqual(
          backendUrl() + "/cards/" + card._id
        );
      };
    }
  });
});
