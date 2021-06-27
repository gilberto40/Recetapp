import User from '../models/User.js'
import StockItem from '../../../shared/models/StockItem.js'
import Ingredient from '../../../ingredients/business/models/Ingredient.js'
import { createErrorUserNotFound } from '../../../shared/errors/ErrorUserNotFound.js'

class UserService {

    constructor(userManager) {
        this.users = userManager
        this.addTestData()
    }

    async add(user) {
        //TODO: VER QUE VUELVE Y CREAR UN OBJETO USER
        await this.users.add(user)
    }

    async getAll() {
        return await this.users.getAll()
    }

    async getById(id) {
        const user = await this.users.getById(id)
        if(!user){
            throw createErrorUserNotFound()
        }
        return user
    }

    async deleteById(id) {
        return await this.users.deleteById(id)
    }

    async updateById(user) {
        return await this.users.updateById(user)
    }

    async getUserInventory(id) {
        const self = this
        const user = await self.getById(id)
        return await user.inventory
    }

    async updateUserInventory(id, inventory) {
        const self = this
        const user = await self.getById(id)
        user.inventory = inventory

        return await this.users.updateById(user)
    }

    async addTestData() {
        const self = this

        const ingredient = new Ingredient({
            name: 'Huevo',
            unit: 'unidad'
        })

        const stockItem = new StockItem({
            ingredient: ingredient,
            amount: 4
        })

        await self.add(new User({
            name: 'Usuario',
            lastname: 'Test',
            email: 'gastongp93@gmail.com',
            password: '1234',
            inventory: {
                ingredient: stockItem.ingredient,
                amount: stockItem.amount
            }
        }))
    }
}

export default UserService