import org.jfree.chart.JFreeChart;
import net.sf.jasperreports.engine.JRChart;
import net.sf.jasperreports.engine.JRChartCustomizer;
import java.awt.Color;
import org.jfree.chart.axis.CategoryAxis;
import org.jfree.chart.axis.CategoryLabelPositions;


public class BarChartCustomizer implements JRChartCustomizer {

	private Number tickUnits;
	
	public BarChartCustomizer() {
		tickUnits = Integer.valueOf(0);
	}

	@Override
	public void customize(org.jfree.chart.JFreeChart chart, net.sf.jasperreports.engine.JRChart jasperChart) {
		org.jfree.chart.renderer.category.BarRenderer renderer;
		org.jfree.chart.plot.CategoryPlot plot;
		org.jfree.chart.axis.NumberAxis rangeAxis;
		org.jfree.chart.axis.CategoryAxis axis;
		renderer = (org.jfree.chart.renderer.category.BarRenderer) chart.getCategoryPlot().getRenderer();
		
		plot = chart.getCategoryPlot();
		rangeAxis = (org.jfree.chart.axis.NumberAxis) plot.getRangeAxis();
		
		axis = plot.getDomainAxis();
		
		CategoryAxis domainAxis = plot.getDomainAxis();
		CategoryLabelPositions pos = domainAxis.getCategoryLabelPositions();
		
		for(int i=0; i< plot.getCategories().size()-1; i++) {
			if(i%6==0){
				String cat_Name = (String) plot.getCategories().get(i);
			} else {
				String cat_Names = (String) plot.getCategories().get(i);
				domainAxis.setTickLabelPaint(cat_Names, Color.white);     
			}
		}
	// plot.getDomainAxis().setLabel("TEST "+plot.getCategories().size()+"  "+pos.);

	}
}
