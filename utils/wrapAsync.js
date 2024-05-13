// module.exports = async (fn) => {
//     return (req, res, next) => {
//         fn(req, res, next).catch(next);
//     }
// }
module.exports = (fn) => {
    return (req, res, next) => {
        // Execute the function and handle errors
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
