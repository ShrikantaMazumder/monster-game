const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 20;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

let chosenMaxLife = 100;
let hasBonusLife = true;

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function endRound() {
   let initialPlayerHealth = currentPlayerHealth;
   const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
   currentPlayerHealth -= playerDamage;

   if (currentPlayerHealth <= 0 && hasBonusLife) {
      hasBonusLife = false;
      removeBonusLife();
      currentPlayerHealth = initialPlayerHealth;
      setPlayerHealth(initialPlayerHealth);
      alert('Bonus life saved you');
      
   }

   if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
     message.innerHTML = `<p style="color: red">Player Winner</p>`;
     setInterval(() => {
       message.innerHTML = '';
    }, 2000);
    btn.disabled = true;
   } else if (currentPlayerHealth <=0 && currentMonsterHealth > 0) {
      message.innerHTML = `<p style="color: red">Monster Winner</p>`;
      setInterval(() => {
       message.innerHTML = '';
    }, 2000);
    btn.disabled = true;
   } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
      message.innerHTML = `<p style="color: red">Match Draw!</p>`;
      setInterval(() => {
       message.innerHTML = '';
    }, 2000);
    btn.disabled = true;
   }
}

function attackMonster (mode) {
   let maxDamage;
   let btn;
   if (mode === 'ATTACK') {
      maxDamage = ATTACK_VALUE;
      btn = attackBtn
   } else if (mode === 'STRONG_ATTACK') {
      maxDamage = STRONG_ATTACK_VALUE;
      btn = strongAttackBtn;
   }

   const damage = dealMonsterDamage(maxDamage);
   currentMonsterHealth -= damage;

   endRound();
}

// normal attack
function attackHandler() {
   attackMonster('ATTACK');
  
}

// Strong attack
function strongAttackHandler () {
   attackMonster('STRONG_ATTACK');
}

// Heal player
function healPlayerHandler() {
   let healValue;
   if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
      alert("You can't improve health!");
      healValue = chosenMaxLife - currentPlayerHealth;
      
   } else {
      healValue = HEAL_VALUE;
   }
   increasePlayerHealth(healValue);
   currentPlayerHealth += healValue;
   endRound();
}

attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click',healPlayerHandler);