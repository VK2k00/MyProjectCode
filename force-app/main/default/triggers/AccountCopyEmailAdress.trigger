trigger AccountCopyEmailAdress on Account (before insert) {
    AccountCopyEmailAdressHandler.copyEmail(trigger.new);

}