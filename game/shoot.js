var bulletTime1 = 0;

var bullet_player1_material = new THREE.MeshLambertMaterial(
{
    color: 0x00ff00, 
    transparent: false
});

function shoot()
{
    if (keyboard.pressed("space") && bulletTime1 + 0.8 < clock.getElapsedTime())
    {
        bullet = new THREE.Mesh(
            new THREE.SphereGeometry(2),
            bullet_player1_material);
        scene.add(bullet);
        bullet.position.x = player1.graphic.position.x + 7.5 * Math.cos(player1.direction);
        bullet.position.y = player1.graphic.position.y + 7.5 * Math.sin(player1.direction);
        bullet.angle = player1.direction;
        player1.bullets.push(bullet);
        bulletTime1 = clock.getElapsedTime();
    } 

    // move bullets
    var moveDistance = 5;

    for (var i = 0; i < player1.bullets.length; i++)
    {
        player1.bullets[i].position.x += moveDistance * Math.cos(player1.bullets[i].angle);
        player1.bullets[i].position.y += moveDistance * Math.sin(player1.bullets[i].angle);
    }

}

function collisions()
{
    bullet_collision();
    player_collision();
    player_falling();
}

function bullet_collision()
{
    //collision between bullet and walls
    for (var i = 0; i < player1.bullets.length; i++)
    {
        if (Math.abs(player1.bullets[i].position.x) >= WIDTH / 2 ||
            Math.abs(player1.bullets[i].position.y) >= HEIGHT / 2)
        {
            scene.remove(player1.bullets[i]);
            player1.bullets.splice(i, 1);
            i--;
        }

        // If the player's bullet touch the ennemy, the ennemy disapear
        if(Math.abs(player1.bullets[i].position.x) > Math.abs(ennemy1.position.x)-10 &&
            Math.abs(player1.bullets[i].position.x) < Math.abs(ennemy1.position.x+10) &&
            Math.abs(player1.bullets[i].position.y) > Math.abs(ennemy1.position.y) -10 &&
            Math.abs(player1.bullets[i].position.y) < Math.abs(ennemy1.position.y+10)
            )
            {
                scene.remove(player1.bullets[i]);
                player1.bullets.splice(i, 1);
                i--;
                scene.remove(ennemy1.graphic);
            }
    }
}

function player_collision()
{
    //collision between player and walls
    var x = player1.graphic.position.x + WIDTH / 2;
    var y = player1.graphic.position.y + HEIGHT / 2;

    if ( x > WIDTH )
        player1.graphic.position.x -= x - WIDTH;
    if ( x < 0 )
        player1.graphic.position.x -= x;
    if ( y < 0 )
        player1.graphic.position.y -= y;
    if ( y > HEIGHT )
        player1.graphic.position.y -= y - HEIGHT;

    // Check if the player is touching the ennemy
    if(Math.abs(player1.position.x) > Math.abs(ennemy1.position.x)-10 &&
            Math.abs(player1.position.x) < Math.abs(ennemy1.position.x+10) &&
            Math.abs(player1.position.y) > Math.abs(ennemy1.position.y) -10 &&
            Math.abs(player1.position.y) < Math.abs(ennemy1.position.y+10))
            {
                if (player1.IsTouchingEnnemy == false)
                {
                    player1.life -=1;
                    player1.IsTouchingEnnemy = true;
                }
                
            }
    else
    {

                player1.IsTouchingEnnemy = false;
    }

}

function player_falling()
{
    var nb_tile = 10;
    var sizeOfTileX = WIDTH / nb_tile;
    var sizeOfTileY = HEIGHT / nb_tile;
    var x = player1.position.x | 0;
    var y = player1.position.y | 0;
    var length = noGround.length;
    var element;
    var tileX;
    var tileY;
    var mtileX;
    var mtileY;

    for (var i = 0; i < length; i++) {
        element = noGround[i];

        if (element){
            tileX = (element[0]) | 0;
            tileY = (element[1]) | 0;
            mtileX = (element[0] + sizeOfTileX) | 0;
            mtileY = (element[1] + sizeOfTileY) | 0;
        }
        

        if ((x > tileX)
            && (x < mtileX)
            && (y > tileY) 
            && (y < mtileY))
        {
            // If player is touching a black tile, decrease life by 1 and reset position
            player1.life -= 1;
            player1.position.x = 0;
            player1.position.y = 0;
        }
        
        // If player have 0 live left, he died 
        if (player1.life == 0)
        {
            player1.dead();
        }
    }

}
