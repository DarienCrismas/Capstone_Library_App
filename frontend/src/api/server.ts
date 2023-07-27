export const serverCalls = {
    user_token: localStorage.getItem("user_token"),
    // get all
    get: async () => {
        const response = await fetch(`https://capstone-backend-dc.glitch.me/api/library/${serverCalls.user_token}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok){
            throw new Error('Failed to fetch data from server')
        }
        return await response.json()
    },

    // create
    create: async(data: any = {}) => {
        const response = await fetch(`https://capstone-backend-dc.glitch.me/api/library/${serverCalls.user_token}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        if (!response.ok){
            throw new Error("Failed to create data"), response.status
        };
        return await response.json()
    },

    // update
    update: async (id:string, data:any = {}) => {
        const response = await fetch(`https://capstone-backend-dc.glitch.me/api/library/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        if (!response.ok){
            throw new Error("Failed to update data"), response.status
        };
        return await response.json()
    },
    delete: async(id:string) => {
        const response = await fetch(`https://capstone-backend-dc.glitch.me/api/library/${id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok){
            throw new Error("Failed to delete data"), response.status
        };
    }
}