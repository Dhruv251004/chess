from rest_framework.response import Response

class APIResponse:
    @staticmethod
    def success(message='Success', data=None, status=200):
        """
        Standardized success response structure.
        :param message: Success message, default is 'Success'.
        :param data: The data to be returned in the response.
        :param status: HTTP status code, default is 200.
        :return: A standardized Response object.
        """
        response = {
            'status': 'success',
            'message': message,
            'data': data
        }
        return Response(response, status=status)

    @staticmethod
    def error(message='An error occurred', errors=None, status=400):
        """
        Standardized error response structure.
        :param message: Error message, default is 'An error occurred'.
        :param errors: Additional error details, such as field-specific errors.
        :param status: HTTP status code, default is 400.
        :return: A standardized Response object.
        """
        response = {
            'status': 'error',
            'message': message,
            'errors': errors if errors else "No specific error details available."
        }
        return Response(response, status=status)
