import net.sf.jasperreports.engine.JRAbstractChartCustomizer;
import net.sf.jasperreports.engine.JRChart;
import net.sf.jasperreports.engine.JRPropertiesMap;
 
import org.jfree.chart.JFreeChart;
 
import org.jfree.chart.axis.LogarithmicAxis;
 
/**
* A JRChartCustomizer to allow charts to use a logarithmic range (Y) axis.
* http://community.jaspersoft.com/questions/541998/logarithmic-scale
*
* @author Chris Schultz
* @version 2012-03-19
*/
public class LogarithmicRangeAxisCustomizer
    extends JRAbstractChartCustomizer
{
    static final long serialVersionUID = 740940032573770219L;
 
    public void customize(JFreeChart chart, JRChart jrChart)
    {
        JRPropertiesMap pm = jrChart.getPropertiesMap();
 
        double lowerRange;
        double upperRange;
 
        if(null != pm
           && null != pm.getProperty("rangeAxisMinValueExpression"))
            lowerRange = Double.parseDouble(pm.getProperty("rangeAxisMinValueExpression"));
        else
            lowerRange = 0;
 
        if(null != pm
           && null != pm.getProperty("rangeAxisMaxValueExpression"))
            upperRange = Double.parseDouble(pm.getProperty("rangeAxisMaxValueExpression"));
        else
            upperRange = 1000;
 
        LogarithmicAxis logScale = new LogarithmicAxis("Your Label Here");
 
        logScale.setStrictValuesFlag(true);
        logScale.setRange(lowerRange, upperRange);
        logScale.setTickLabelsVisible(true);
 
        chart.getXYPlot().setRangeAxis(logScale);
    }
}
