import * as sql from "./sql.js";

const action = {
  member: {
    get: ([args]) => sql.getMembers(args),
    del: ([args]) => sql.delMember(args),
    post: ([args]) => sql.addMember(args),
  },
};

export default action;
