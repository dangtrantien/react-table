import axios from "axios";

export default class API {
  getList = async (params) => {
    const res = await axios({
    //   headers: {
    //     Authorization: "Bearer <<access_token>>",
    //     ContentType: "application/json;charset=utf-8",
    //   },
      method: "GET",
      url: "https://api.themoviedb.org/3/list/509ec17b19c2950a0600050d?api_key=1b2f153ab8823e1d097033abe41fdf3e&language=en-US",
      data: null,
    });

    return res;
  };
}
