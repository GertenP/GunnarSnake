<template>
  <div class="page">
    <router-link to="/" class="back-link">
      ❮ Avalehele
    </router-link>



    <div class="header-section">
      <div class="title-badge">
        <h1 class="info-title">INFO</h1>
        <img src="../assets/GameOfTheYear.png" class="badge">
        <img src="../assets/GunnarLogo.png" class="Gunnar-Logo">
      </div>

      <div class="text-gunnar">
        <div class="info-box">
          <p>
            Antud projekt valmis HTML ja OSS tunni raames, kuid mitte lihtsalt suvalise üssimängu – oh ei! Klassikalise
            üssimängu lihtsa, loogika peale ehitatud mudeli peale enamgi. Legendaarse Programmeerimine II õpetaja
            Gunnari
            nõusolekuga sündis mäng, mis ei kogu ainult punkte, vaid kogub ka tarkust.
          </p>
          <p>
            Meie eesmärk oli luua midagi, mis teeks haridussüsteemi vähemalt sama heaks kui vana hea .NET ise – ehk siis
            praktiline, loogiline ja natuke üle võlli. Mängides saab noor arendaja aimu, kuidas programmeerimine (eriti
            C# ja .NET maailmas) tegelikult käib.
          </p>
          <p>
            Täname kõiki, kes meie hulluteged ideed toetasid – ilma teieta oleks see lihtsalt üks tavaline use ekraanil.
          </p>
        </div>
        <img src="../assets/Gunnar To Info.png" class="gunnar-snake">
      </div>
    </div>

    <div class="team-container">
      <h2 class="team-title">ELIITHÄKKERID</h2>
      <div class="team">
        <div class="member">
          <img src="../assets/Andri With Frame 1.png" class="frame-img" />
          <div class="member-name">Andri Reinek</div>
        </div>
        <div class="member">
          <img src="../assets/Gerten With Frame 1.png" class="frame-img" />
          <div class="member-name">Gerten Pilv</div>
        </div>
        <div class="member">
          <img src="../assets/Mark With Frame 1.png" class="frame-img" />
          <div class="member-name">Mark Jakob Pontus</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap');

body,
.page {
  font-family: 'Pixelify Sans', sans-serif;
  background-color: #3a3a3a;
  color: white;
  padding: 20px;
  margin: 0;  
}

.Gunnar-Logo {
  margin-left: auto;
}

.back-link {
  position: absolute;
  top: 10px;
  left: 10px;
  color: white;
  font-size: 1.2em;
  text-decoration: none;
}

.header-section {
  text-align: center;
}

.title-badge {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.info-title {
  font-size: 120px;
  -webkit-text-stroke: 4px #EB7702;
  color: white;
  text-shadow: 2px 2px #000;
  margin: 0;
  margin-left: 700px;
}

.badge {
  width: 80px;
  height: auto;
}

.text-gunnar {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 30px;
  margin-top: 30px;
  flex-wrap: wrap;
}

.info-box {
  background-color: #2a2a2a;
  padding: 20px;
  border-radius: 12px;
  max-width: 600px;
  box-shadow: 0 0 10px black;
  text-align: left;
}

.gunnar-snake {
  height: 400px;
  margin-left: 250px;
}

.team-container {
  margin-top: 50px;
  text-align: center;
}

.team-title {
  font-size: 60px;
  color: white;
  -webkit-text-stroke: 2px #EB7702;
  margin-bottom: 20px;
}

.team {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.member {
  text-align: center;
}

.frame-img {
  width:  350px;
}

.member-name {
  margin-top: 10px;
  font-size: 30px;
  color: white;
  -webkit-text-stroke: 1px #EB7702;
}
</style>
