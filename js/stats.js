const attendanceLowest = document.querySelector("#eventsCardsLowest");
const eventsCardsHighest = document.querySelector("#eventsCardsHighest");
const tableUpcoming = document.querySelector("#tableUpcoming");
const tablePast = document.querySelector("#tablePast");
const apiUrl = "https://mindhub-xj03.onrender.com/api/amazing";

fetch(apiUrl)
  .then((response) => response.json())
  .then((dataApi) => {
    const eventsList = dataApi.events;
    function attendancePercentage(eventsList, order = "Highest") {
      let attendancePercentageEvent = "";
      let eventCount = 0; // variable para contar los eventos iterados

      if (order === "Highest") {
        eventsList.sort((a, b) => {
          const percentageA = a.assistance / a.capacity;
          const percentageB = b.assistance / b.capacity;
          return percentageB - percentageA;
        });
      } else if (order === "Lowest") {
        eventsList.sort((a, b) => {
          const percentageA = a.assistance / a.capacity;
          const percentageB = b.assistance / b.capacity;
          return percentageA - percentageB;
        });
      }

      // Recorre la matriz de eventos ordenados y muestra solo el primer evento
      eventsList.forEach((event) => {
        if (event.assistance != null && event.capacity != null) {
          const attendancePercentage =
            (event.assistance / event.capacity) * 100;
          eventCount++; // incrementa el contador de eventos iterados
          if (eventCount === 1) {
            // si el evento actual es el primero
            attendancePercentageEvent = `${
              event.name
            }: ${attendancePercentage.toFixed(2)}%<br>`;
            return;
          }
        }
      });

      return attendancePercentageEvent;
    }

    //evento con mayor asistencia.
    function mostCapacity(data, currentDate) {
      arrPast=data.filter(event => event.date < currentDate)
      const arrayCapacity = arrPast.map(event => {
        return {
          capacity: event.assistance, 
          nameEvent: event.name,
        }
      })
      arrayCapacity.sort((a, b) => b.capacity - a.capacity)
      const maxCapacityEvent = arrayCapacity[0];
      return ` ${maxCapacityEvent.nameEvent} with ${maxCapacityEvent.capacity} asistentes`;
    }
    

    //TABLA1
    eventsCardsHighest.innerHTML = attendancePercentage(eventsList, "Highest");
    eventsCardsLowest.innerHTML = attendancePercentage(eventsList, "Lowest");
    eventsCapacityList.innerHTML =  mostCapacity(dataApi.events, dataApi.currentDate)
   
    //END FIRST TABLE

    function generateStatsAndTable(eventList, filterType) {
      let filteredEvents;
      if (filterType === "past") {
        filteredEvents = eventList.filter(
          (event) => new Date(event.date) < new Date()
        );
      } else if (filterType === "future") {
        filteredEvents = eventList.filter(
          (event) => new Date(event.date) >= new Date()
        );
      } else {
        throw new Error("Invalid filter type");
      }
      filteredEvents.sort((a, b) => a.category.localeCompare(b.category)); //Ordeno el Filtro por nombre de categorias
      const statsByCategory = filteredEvents.reduce((accumulator, event) => {
        const attendancePercentage =
          filterType === "past"
            ? (event.assistance / event.capacity) * 100
            : (event.estimate / event.capacity) * 100;
        const estimatedAmount =
          filterType === "past"
            ? event.assistance * event.price
            : event.estimate * event.price;
        if (accumulator[event.category]) {
          accumulator[event.category].attendancePercentage +=
            attendancePercentage;
          accumulator[event.category].estimatedAmount += estimatedAmount;
          accumulator[event.category].count++;
        } else {
          accumulator[event.category] = {
            attendancePercentage: attendancePercentage,
            estimatedAmount: estimatedAmount,
            count: 1,
          };
        }
        return accumulator;
      }, {});

      const tableData = [];
      for (const category in statsByCategory) {
        const attendancePercentage =
          statsByCategory[category].attendancePercentage /
          statsByCategory[category].count;
        const estimatedAmount = statsByCategory[category].estimatedAmount;
        tableData.push({
          category: category,
          revenue:
            "$" +
            estimatedAmount.toLocaleString("en-US", {
              maximumFractionDigits: 0,
            }),
          attendancePercentage: attendancePercentage.toFixed(2),
        });
      }

      const table = document.createElement("table");
      table.classList.add("table", "table-bordered", "table-striped");
      const tableHeader = table.createTHead();
      tableHeader.classList.add("table-secondary");
      const headerRow = tableHeader.insertRow();
      const categoryHeader = document.createElement("th");
      categoryHeader.textContent = "Category";
      headerRow.appendChild(categoryHeader);
      const revenueHeader = document.createElement("th");
      revenueHeader.textContent = "Revenue";
      headerRow.appendChild(revenueHeader);
      const attendanceHeader = document.createElement("th");
      attendanceHeader.textContent = "Percentage of Attendance";
      headerRow.appendChild(attendanceHeader);

      const tableBody = table.createTBody();
      for (const row of tableData) {
        const tableRow = tableBody.insertRow();
        const categoryCell = tableRow.insertCell();
        categoryCell.textContent = row.category;
        const revenueCell = tableRow.insertCell();
        revenueCell.textContent = row.revenue;
        const attendanceCell = tableRow.insertCell();
        attendanceCell.textContent = row.attendancePercentage + "%";
      }
      return table;
    }
    //TABLE 2
    const upcomingTable = generateStatsAndTable(eventsList, "future");
    tableUpcoming.appendChild(upcomingTable);
    //TABLE 3
    const pastTable = generateStatsAndTable(eventsList, "past");
    tablePast.appendChild(pastTable);
  })
  .catch((error) => console.error(error));


//Escuchar el evento addEventListener() y escuchar el evento de clic para desplegar la lista
var originalMarginTop = main.style.marginTop;

button.addEventListener('click', function() {
  if (main.style.marginTop !== originalMarginTop) {
    main.style.marginTop = originalMarginTop;
  } else {
    main.style.marginTop = '300px';
  }
});