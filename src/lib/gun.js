import GUN from "gun";
import "gun/sea";
import "gun/lib/rindexed";
import "gun/lib/yson";
import "gun/axe";

export const db = GUN({
  peers: ["https://gunjs.herokuapp.com/gun", "http://localhost:8765/gun"],
  localStorage: false
});

// Gun User
export const user = db.user().recall({ sessionStorage: true });
