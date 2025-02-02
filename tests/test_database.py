from app import app, db
from sqlalchemy import text
import unittest

class TestDatabaseConnection(unittest.TestCase):
    def test_database_connection(self):
        with app.app_context():  # Uygulama bağlamını başlatıyoruz
            result = db.session.execute(text("SELECT 1"))
            self.assertEqual(result.scalar(), 1)

if __name__ == "__main__":
    unittest.main()

