window.onload = function () {
  // Cache DOM elements
  const bagetDanger = document.getElementById("id-danger");
  const listlog = document.getElementById("listlog");

  // Ruta al archivo .log
  const filePath = "./prueba.txt";

  fetch(filePath)
    .then((response) => response.text())
    .then((data) => {

      let attacks = 0; 
      const lines = data.split("\n");
        
      const ipPattern = /^101\.249\./;
      const statusCodePattern = /(?:\S+\s+){2}(\d{3})\s/;

      lines.forEach((line, index) => {
        setTimeout(function () {
          const ipMatch = line.match(/\d+\.\d+\.\d+\.\d+/);
          const statusCodeMatch = line.match(statusCodePattern);
          const statusCode = parseInt(statusCodeMatch[1]);

          const li = document.createElement("li");
          if (
            ipMatch &&
            ipPattern.test(ipMatch[0]) &&
            statusCode >= 200 &&
            statusCode < 300
          ) {
            li.className = "list-group-item list-group-item-danger p-0";
            attacks += 1
            bagetDanger.innerHTML = attacks
            li.textContent =  line;
          } else {
            li.className = "list-group-item list-group-item-success p-0";
            li.textContent =  line;
          }
          listlog.appendChild(li);
        }, 300 * (index + 1));
      });
    })
    // .catch((error) => {
    //   console.error("Error al cargar el archivo:", error);
    // });
};
