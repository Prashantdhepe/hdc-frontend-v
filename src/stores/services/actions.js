import axiosClient from "@/axios.js";

export default {
    // This action is used to fetch all the courses types present in database
    async list({ commit }) {

        return await axiosClient.get('/services')
            .then(({ data }) => {
                commit('SET_SERVICES', data);
                return data;
            })
            .catch(({response}) => {
                console.log(response);
            });
    },
};