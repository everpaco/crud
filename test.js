const { Sequelize } = require('sequelize');
const { User, Post } = require('./models'); 

async function main() {
  try {
  //conexion bd
    const sequelize = new Sequelize(
      'mi_base_de_datos_dev', 
      'postgres',             
      'postgres',             
      {
        host: '127.0.0.1',
        dialect: 'postgres',
        logging: false
      }
    );

    // Verificar conexión
    await sequelize.authenticate();
    console.log('Conexión a PostgreSQL exitosa!');

    

    // Crear un usuario
    const nuevoUsuario = await User.create({
      nombres: 'Ever Paco',
      email: 'everpaco@example.com',
      pass: '123456'
    });

    console.log('Usuario creado:', nuevoUsuario.toJSON());

    // Crear un post asociado al usuario
    const nuevoPost = await Post.create({
      title: 'Mi primer post',
      content: 'Este es el contenido del post.',
      userId: nuevoUsuario.id
    });

    console.log('Post creado:', nuevoPost.toJSON());

    // Traer todos los usuarios con sus posts
    const usersConPosts = await User.findAll({
      include: {
        model: Post,
        as: 'posts'
      }
    });

    console.log('Usuarios con sus posts:');
    console.log(JSON.stringify(usersConPosts, null, 2));

    await sequelize.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

main();