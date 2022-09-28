function update()
{
    var delta = clock.getDelta(); // seconds.
    var moveDistance = 50 * delta; // 200 pixels per second
    var rotateAngle = Math.PI / 2 * delta * 2;   // pi/2 radians (90 degrees) per second
    var rotateAngle = Math.PI / 2 * delta * 2;   // pi/2 radians (90 degrees) per second

    if (keyboard.pressed("left"))
        player1.turnLeft(rotateAngle);
    if (keyboard.pressed("right"))
        player1.turnRight(-rotateAngle);
    if (keyboard.pressed("up"))
        player1.accelerate(moveDistance);
    if (keyboard.pressed("down"))
        player1.decelerate(moveDistance);

    // Move the player to the right while it's position is <= 150
    if (ennemy1.position.x <= 150 && ennemy1.ennemyGoingRight == true)
    {
        ennemy1.position.x +=1;
    }
    else
    {
        ennemy1.ennemyGoingRight = false;
        ennemy1.ennemyGoingLeft = true;
    }

    // Move the player to the left while it's position is >= 0
    if (ennemy1.position.x >= 0 && ennemy1.ennemyGoingLeft == true)
    {
        ennemy1.position.x -=1;
    }
    else
    {
        ennemy1.ennemyGoingLeft = false;
        ennemy1.ennemyGoingRight = true;
    }


    player1.move();
    ennemy1.move();
    controls.update();
}