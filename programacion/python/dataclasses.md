https://www.python.org/dev/peps/pep-0557/

Son un tipo de clases pensadas para almacenar datos.


Ejemplo:
@dataclass
class InventoryItem:
    '''Class for keeping track of an item in inventory.'''
    name: str
    unit_price: float
    quantity_on_hand: int = 0

    def total_cost(self) -> float:
        return self.unit_price * self.quantity_on_hand
