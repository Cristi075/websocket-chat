package application.exceptions;

public class DuplicateException extends Exception {
    public DuplicateException(String message){
        super(message);
    }

    public DuplicateException() {
        this("No duplicates allowed.");
    }
}
