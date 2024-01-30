function messenger(io, socket) {

   UsersOnline[socket.id] = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      socketId: socket.id
   };

   //       socket.emit('userData', { user, socketId: socket.id });
   socket.emit('userData', {
      user: {
         firstName: userData.firstName,
         lastName: userData.lastName
      }, socketId: socket.id
   });

   socket.on('disconnect', () => {
      console.log('User disconnected');
      delete UsersOnline[socket.id];
   });

}





