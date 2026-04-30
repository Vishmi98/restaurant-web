import mongoose from "mongoose";

// We define a sub-schema for Customer to ensure it follows your CustomerDataType structure
const CustomerSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
});

const OrderSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },
        customer: {
            type: CustomerSchema,
            required: true
        },
        totalAmount: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: ['Pending', 'Preparing', 'Out for Delivery', 'Delivered']
        },
        paymentMethod: {
            type: String,
            required: true,
            enum: ['Cash', 'Card']
        },
        dishes: {
            type: [Number],
            required: true
        },
        numberOfDishes: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

OrderSchema.virtual('dishesInfo', {
    ref: 'Dish',
    localField: 'dishes',
    foreignField: 'id',
});

OrderSchema.set('toObject', { virtuals: true });
OrderSchema.set('toJSON', { virtuals: true });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);