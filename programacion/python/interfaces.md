https://realpython.com/python-interface/

Existe un método más formal usando el módulo "abc".

Este es el método informal.

Definirla:
class InformalParserInterface:
    def load_data_source(self, path: str, file_name: str) -> str:
        """Load in the file for extracting text."""
        pass

    def extract_text(self, full_file_name: str) -> dict:
        """Extract text from the currently loaded file."""
        pass


Usarla:
class PdfParser(InformalParserInterface):

