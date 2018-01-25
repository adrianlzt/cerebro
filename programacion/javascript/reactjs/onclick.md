Pasar parametros al handler del onclick:

https://reactjs.org/docs/handling-events.html#passing-arguments-to-event-handlers

<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>

deleteRow(report,event) {
  event.preventDefault()
  ...
}
