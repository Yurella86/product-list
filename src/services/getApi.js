
export default class QueryService {

    _apiBase = 'https://606efbdf0c054f001765814c.mockapi.io/api/v1/products';

    async getData() {
        const response = await fetch(`${this._apiBase}`);
        if (!response.ok) {
            throw new Error(`Not fetch products`)
        }
        return await response.json();
    }

    async postData(item) {
        const response = await fetch(`${this._apiBase}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(item)
        });
        if (!response.ok) {
            throw new Error(`Not fetch products`)
        }
        return await response.json();
    }

    async getComments(id) {
        const response = await fetch(`${this._apiBase}/${id}/coments`);
        const body = await response.json()
        return body
    }


    async deleteItem(id) {
        const response = await fetch(`${this._apiBase}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Not fetch products`)
        }
        return await response.json();
    }
}