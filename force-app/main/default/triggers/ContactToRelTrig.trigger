trigger ContactToRelTrig on Contact (After insert) {
    ContactToConRelCls.contactrel(trigger.new);

}