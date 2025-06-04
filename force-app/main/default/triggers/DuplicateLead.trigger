trigger DuplicateLead on Lead (before insert) {
    DuplicateLeadHelper.duplLead(trigger.new);

}