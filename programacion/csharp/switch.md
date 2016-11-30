switch (month)
{
    case 1:
        monthString = "January";
        break;
    case 2:
        monthString = "February";
        break;
    case 3:
        monthString = "March";
        break;
    // You can assign more than one case to an action
    // But you can't add an action without a break before another case
    // (if you want to do this, you would have to explicitly add a goto case x
    case 6:
    case 7:
    case 8:
        monthString = "Summer time!!";
        break;
    default:
        monthString = "Some other month";
        break;
}
