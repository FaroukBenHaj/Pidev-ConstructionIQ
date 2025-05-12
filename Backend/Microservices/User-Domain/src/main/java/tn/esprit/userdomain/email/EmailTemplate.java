package tn.esprit.userdomain.email;

public enum EmailTemplate {
    ACTIVATION_ACCOUNT("activate_account"),
    RESET_PASSWORD("reset_password");

    private final String name;

    EmailTemplate(String name) {
        this.name = name;
    }


}
