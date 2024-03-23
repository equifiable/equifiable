from database.management import DatabaseManagement

# Object to be used by other files
database_management = dict()

database_management['admins'] = DatabaseManagement(table_name='Admins',
                                                  class_name_id='admin_id')

database_management['companies'] = DatabaseManagement(table_name='Companies',
                        class_name_id='company_id')

database_management['recipients'] = DatabaseManagement(table_name='Recipients',
                        class_name_id='recipient_id')

database_management['shares'] = DatabaseManagement(table_name='Shares',
                        class_name_id='shares_id')

database_management['users'] = DatabaseManagement(table_name='Users',
                                                  class_name_id='user_id')
