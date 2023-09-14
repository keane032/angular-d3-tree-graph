import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-tree-graph',
  templateUrl: './tree-graph.component.html',
  styleUrls: ['./tree-graph.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TreeGraphComponent implements OnInit {

  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;
  @Input() data: any 
  @Input() boxWidth: any = 210
  @Input() boxHeigth: any = 60
  @Input() screenWidth: any = 1300
  @Input() screenHeigth: any = 800

  public svg: any;
  public root: any;

  public margin = { top: 20, right: 50, bottom: 30, left: 50 };
  public width = this.screenWidth - this.margin.left - this.margin.right;
  public height = this.screenHeigth - this.margin.top - this.margin.bottom;

  firstLabel: any;
  lastLabel: any;

  public blue = '#337ab7';
	public green = '#5cb85c';
	public yellow = '#f0ad4e';
	public blueText = '#4ab1eb';
	public purple = '#9467bd';

  public isVertical: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.createTreeChart();
  }

  checkColor(item: any){
    if(item.children){
      if(item.name == this.data?.name){
        return this.green
      }
      return this.blue
    }else{
      return this.purple;
    }
  }

  private createTreeChart(): void {

    this.svg = d3.select(this.chartContainer.nativeElement)
      .append('div') 
      .classed('scrollable-container', true) 
      .append('svg')
      .attr('class', 'chart-svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

      // adiciona a sta no final da linha
      this.svg.append('defs')
      .append('marker')
      .attr('id', 'arrowhead')
      .attr('refX', 6)
      .attr('refY', 2)
      .attr('markerWidth', 6)
      .attr('markerHeight', 4)
      .attr('orient', 'auto')
      .append('polygon')
      .attr('points', '0 0, 6 2, 0 4')
      .style('fill', '#ccc');

    const tree = d3.tree()
      .size([this.height, this.width]);

    this.root = d3.hierarchy(this.data);

    this.root.x0 = this.height / 2;
		this.root.y0 = 0;

    const treeData = tree(this.root);
    this.buscarPosicao([treeData])
    const nodes = treeData.descendants();
    const links = treeData.links();

    const node = this.svg.selectAll('.node')
      .data(nodes)
      .enter().append('g')
      .attr('class', 'node')
      //transforma o grafico em horizontal 
      .attr('transform', (d:any) => 
        'translate(' + d.y  + ',' + d.x  + ')' 
      );

      //desenha o retangulo
      node.append('g').append('rect')
        .attr('rx', 6)
        .attr('ry', 6)
        .attr('width', this.boxWidth)
        .attr('height', this.boxHeigth)
        .attr('class', 'node-rect')
        .attr('fill', (d:any) => this.checkColor(d.data))
        .attr('filter', 'url(#drop-shadow)');

      //escreve o texto
      node.append('foreignObject') 
        .attr('width', this.boxWidth) 
        .attr('height', this.boxHeigth) 
        .html((d:any) =>
          '<div class="node-content">'
        + '<div class="title">' + d.data.name + '</div>' 
        + '<div class="value">' + d.data.total + '</div>'      
        + '</div>'
        );

      const link = this.svg.selectAll('.link')
      .data(links)
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', (d:any) => this.diagonal(d) 
        ).attr('marker-end', 'url(#arrowhead)')
  }

  buscarPosicao(lista:any){
    lista.forEach((element:any) => {
      if(element.children){
        this.buscarPosicao(element?.children)
      }
      // essa variavel altera os espacos dos retangulos no eixo X
      // ( sim apesar de ser y como esta na horizontal o eixo esta invertido)
      element.y = this.boxWidth*element.depth*1.6 
    });
  }
  
  // faz os calculos para o inicio e o fim de cada linha ser 
  // a direita e a esquerda de cada retangulo respectivamente
  diagonal(d: any) {
		var p0 = {
			x :  d.source.x + this.boxHeigth / 2,
			y : d.source.y + this.boxWidth 
		};
    var p3 = {
			x : d.target.x + this.boxHeigth / 2,
			y : d.target.y 
		};

    var m = (p0.y + p3.y) / 2;
    
    var p;
    p = [ p0, {
			x : p0.x,
			y : m
		}, {
			x : p3.x ,
			y : m 
		}, p3 ];

		p = p.map(function(d) {
			return [ d.y, d.x ];
		});

		return 'M' + p[0] + 'C' + p[1] + ' ' + p[2] + ' ' + p[3];
	}
}
