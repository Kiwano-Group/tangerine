// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');


// const loginSchema = new Schema({
//     username: {type: String, required: true, unique: true},
//     password: {type: String, required: true}
//   });
  

//   loginSchema.pre('save', async function (next) {
//       try {
//          const hash = await bcrypt.hash(this.password, 10);
//          this.password = hash;
//          return next();
//       } catch (err) {
//         return next({
//             message: 'ERROR: bcrypt.hash'
//           })
//       }
//   })
  
  
//   loginSchema.methods.comparePassword = async function(candidatePassword, callback) {
//     try {
//         const isMatch =  await bcrypt.compare(candidatePassword, this.password);
//         callback(null, isMatch);
//     } catch (err) {
//         return callback(err)
//     }
//   }
  



// module.exports = mongoose.model('Login', loginSchema);
